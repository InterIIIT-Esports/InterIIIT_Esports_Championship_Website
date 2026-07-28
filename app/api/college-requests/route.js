import { dbConnect } from "@/lib/mongodb";
import CollegeRequest from "@/lib/models/CollegeRequest";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { requireAdmin, requireStaff } from "@/lib/helpers/adminAuth";

/**
 * POST /api/college-requests
 * Create a new college registration request (public).
 */
export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();

    // Extract fields
    const college_name = formData.get("college_name")?.trim();
    const college_website = formData.get("college_website")?.trim() || null;
    const club_name = formData.get("club_name")?.trim();
    const club_email = formData.get("club_email")?.trim();
    const club_instagram = formData.get("club_instagram")?.trim() || null;
    const coordinator_name = formData.get("coordinator_name")?.trim();
    const designation = formData.get("designation")?.trim();
    const contact_number = formData.get("contact_number")?.trim();
    const whatsapp_number = formData.get("whatsapp_number")?.trim() || null;
    const description = formData.get("description")?.trim() || null;
    const experience = formData.get("experience")?.trim() || null;
    const email_domain = formData.get("email_domain")?.trim()?.toLowerCase();
    const intra_registration_form = formData.get("intra_registration_form")?.trim() || "";
    const logoFile = formData.get("college_logo");

    // Validate required fields
    const requiredFields = {
      college_name,
      college_website,
      club_name,
      club_email,
      club_instagram,
      coordinator_name,
      designation,
      contact_number,
      whatsapp_number,
      description,
      experience,
      email_domain,
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        return Response.json(
          { success: false, error: `${field.replace(/_/g, " ")} is required` },
          { status: 400 }
        );
      }
    }

    if (!logoFile || logoFile.size === 0) {
      return Response.json(
        { success: false, error: "college logo is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(club_email)) {
      return Response.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check for duplicate college_name or club_email
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const existing = await CollegeRequest.findOne({
      $or: [
        { college_name: { $regex: new RegExp(`^${escapeRegex(college_name)}$`, "i") } },
        { club_email: club_email.toLowerCase() },
      ],
      status: { $ne: "Rejected" },
    });

    if (existing) {
      return Response.json(
        {
          success: false,
          error: "A registration with this college name or email already exists",
        },
        { status: 409 }
      );
    }

    // Upload logo to Cloudinary
    let college_logo = null;
    if (logoFile && logoFile.size > 0) {
      const bytes = await logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await uploadToCloudinary(buffer);
      college_logo = result.url;
    }

    // Create the request
    const request = await CollegeRequest.create({
      college_name,
      college_logo,
      college_website,
      club_name,
      club_email: club_email.toLowerCase(),
      club_instagram,
      coordinator_name,
      designation,
      contact_number,
      whatsapp_number,
      description,
      experience,
      email_domain,
      intra_registration_form,
      status: "Pending",
    });

    return Response.json(
      { success: true, message: "Registration submitted successfully", id: request._id },
      { status: 201 }
    );
  } catch (err) {
    console.error("College request POST error:", err);
    if (err.stack) console.error(err.stack);
    
    return Response.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/college-requests
 * Fetch college requests.
 * Public: only returns Approved.
 * Admin (with Bearer token): returns filtered by status query param.
 */
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "custom";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "12", 10)));

    // Check if staff
    let isStaff = false;
    try {
      await requireStaff(req);
      isStaff = true;
    } catch {
      // Not staff — public access
    }

    // Build filter
    const filter = {};

    if (!isStaff) {
      // Public only sees approved
      filter.status = "Approved";
    } else if (status && ["Pending", "Approved", "Rejected"].includes(status)) {
      filter.status = status;
    }

    // Search
    if (search) {
      filter.$or = [
        { college_name: { $regex: search, $options: "i" } },
        { club_name: { $regex: search, $options: "i" } },
        { coordinator_name: { $regex: search, $options: "i" } },
        { club_email: { $regex: search, $options: "i" } },
      ];
    }

    // Sort
    const sortOption = sort === "oldest"
      ? { createdAt: 1 }
      : sort === "newest"
        ? { createdAt: -1 }
        : { order: 1, createdAt: 1 };

    const skip = (page - 1) * limit;

    const [requests, total] = await Promise.all([
      CollegeRequest.find(filter).sort(sortOption).skip(skip).limit(limit).lean(),
      CollegeRequest.countDocuments(filter),
    ]);

    return Response.json({
      success: true,
      data: requests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("College request GET error:", err);
    return Response.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
