import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/mongodb";
import CollegeRequest from "@/lib/models/CollegeRequest";
import { requireStaff } from "@/lib/helpers/adminAuth";
import { uploadToCloudinary } from "@/lib/cloudinary";

/**
 * GET /api/college-requests/[id]
 * Fetch a single college request by ID (admin only).
 */
export async function GET(req, { params }) {
  try {
    await requireStaff(req);
    await dbConnect();

    const { id } = await params;
    const request = await CollegeRequest.findById(id).lean();

    if (!request) {
      return Response.json(
        { success: false, error: "Request not found" },
        { status: 404 }
      );
    }

    revalidatePath("/participating-colleges");
    revalidatePath("/");

    return Response.json({ success: true, data: request });
  } catch (err) {
    const status = err.message.includes("Admin") || err.message.includes("Auth") ? 401 : 500;
    return Response.json(
      { success: false, error: err.message },
      { status }
    );
  }
}

/**
 * PATCH /api/college-requests/[id]
 * Update a college request (admin only).
 * Used for: approve, reject, restore, edit fields.
 */
export async function PATCH(req, { params }) {
  try {
    await requireStaff(req);
    await dbConnect();

    const { id } = await params;

    // Support both JSON and FormData
    const contentType = req.headers.get("content-type") || "";
    let updates = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      for (const [key, value] of formData.entries()) {
        if (key === "college_logo" && value instanceof File && value.size > 0) {
          const bytes = await value.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const result = await uploadToCloudinary(buffer);
          updates.college_logo = result.url;
        } else if (key !== "college_logo") {
          updates[key] = value;
        }
      }
    } else {
      updates = await req.json();
    }

    if (updates.order !== undefined && updates.order !== null) {
      updates.order = Number(updates.order);
    }

    // If status is being changed to Approved, set approved_at
    if (updates.status === "Approved") {
      updates.approved_at = new Date();
    }

    // If restoring (setting back to Pending), clear approved_at
    if (updates.status === "Pending") {
      updates.approved_at = null;
    }

    const request = await CollegeRequest.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();

    if (!request) {
      return Response.json(
        { success: false, error: "Request not found" },
        { status: 404 }
      );
    }

    revalidatePath("/participating-colleges");
    revalidatePath("/");

    return Response.json({ success: true, data: request });
  } catch (err) {
    const status = err.message.includes("Admin") || err.message.includes("Auth") ? 401 : 500;
    return Response.json(
      { success: false, error: err.message },
      { status }
    );
  }
}

/**
 * DELETE /api/college-requests/[id]
 * Permanently delete a college request (admin only).
 */
export async function DELETE(req, { params }) {
  try {
    await requireStaff(req);
    await dbConnect();

    const { id } = await params;
    const request = await CollegeRequest.findByIdAndDelete(id);

    if (!request) {
      return Response.json(
        { success: false, error: "Request not found" },
        { status: 404 }
      );
    }

    revalidatePath("/participating-colleges");

    return Response.json({ success: true, message: "Request deleted permanently" });
  } catch (err) {
    const status = err.message.includes("Admin") || err.message.includes("Auth") ? 401 : 500;
    return Response.json(
      { success: false, error: err.message },
      { status }
    );
  }
}
