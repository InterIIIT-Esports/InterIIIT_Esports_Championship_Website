import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/helpers/adminAuth";
import IECTeamMember from "@/lib/models/IECTeamMember";
import { uploadToCloudinary } from "@/lib/cloudinary";

const toOptionalString = (value) => {
  if (value === null || value === undefined) return undefined;
  return String(value).trim();
};

function revalidateTeamPages() {
  revalidatePath("/");
  revalidatePath("/iec-team");
  revalidatePath("/games/bgmi");
  revalidatePath("/games/ff");
  revalidatePath("/games/valo");
}

/**
 * POST /api/admin/iec-team
 * Add a new IEC core team member
 */
export async function POST(req) {
  try {
    await requireAdmin(req);
    await dbConnect();

    const formData = await req.formData();
    const name = toOptionalString(formData.get("name"));
    const role = toOptionalString(formData.get("role"));
    const instagram = toOptionalString(formData.get("instagram"));
    const linkedin = toOptionalString(formData.get("linkedin"));
    const college = toOptionalString(formData.get("college"));
    const order = formData.get("order") || 0;
    const departmentsStr = formData.get("departments");
    let departments = [];
    if (departmentsStr && departmentsStr !== "undefined") {
      try { departments = JSON.parse(departmentsStr); } catch (e) {}
    }
    const imageFile = formData.get("image");

    if (!name || !role || !imageFile) {
      return Response.json({ success: false, error: "Name, role, and image are required" }, { status: 400 });
    }

    let image_url = "";
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await uploadToCloudinary(buffer);
      image_url = result.url;
    }

    const member = await IECTeamMember.create({
      name,
      role,
      image_url,
      instagram,
      linkedin,
      college,
      order: Number(order),
      departments
    });

    revalidateTeamPages();

    return Response.json({ success: true, member });
  } catch (err) {
    const status = err.message.includes("Admin") || err.message.includes("Auth") ? 401 : 500;
    return Response.json({ success: false, error: err.message }, { status });
  }
}

/**
 * PATCH /api/admin/iec-team?id=...
 * Update a member's image (and optionally name/role/links)
 */
export async function PATCH(req) {
  try {
    await requireAdmin(req);
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return Response.json({ success: false, error: "ID required" }, { status: 400 });

    const formData = await req.formData();
    const imageFile = formData.get("image");
    const name = formData.get("name");
    const role = formData.get("role");
    const instagram = formData.get("instagram");
    const linkedin = formData.get("linkedin");
    const college = formData.get("college");
    const order = formData.get("order");
    const departmentsStr = formData.get("departments");
    let departments = undefined;
    if (departmentsStr && departmentsStr !== "undefined") {
      try { departments = JSON.parse(departmentsStr); } catch (e) {}
    }

    const member = await IECTeamMember.findById(id);
    if (!member) return Response.json({ success: false, error: "Member not found" }, { status: 404 });

    const updates = {};

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await uploadToCloudinary(buffer);
      updates.image_url = result.url;
    }

    const nextName = toOptionalString(name);
    const nextRole = toOptionalString(role);
    const nextInstagram = toOptionalString(instagram);
    const nextLinkedin = toOptionalString(linkedin);
    const nextCollege = toOptionalString(college);

    if (nextName) updates.name = nextName;
    if (nextRole) updates.role = nextRole;
    if (nextInstagram !== undefined) updates.instagram = nextInstagram || null;
    if (nextLinkedin !== undefined) updates.linkedin = nextLinkedin || null;
    if (nextCollege !== undefined) updates.college = nextCollege || null;
    if (order !== null && order !== undefined) updates.order = Number(order);
    if (departments !== undefined) updates.departments = departments;

    Object.assign(member, updates);
    await member.save();

    revalidateTeamPages();

    return Response.json({ success: true, member });
  } catch (err) {
    const status = err.message.includes("Admin") || err.message.includes("Auth") ? 401 : 500;
    return Response.json({ success: false, error: err.message }, { status });
  }
}

/**
 * DELETE /api/admin/iec-team?id=...
 */
export async function DELETE(req) {
  try {
    await requireAdmin(req);
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return Response.json({ success: false, error: "ID required" }, { status: 400 });

    await IECTeamMember.findByIdAndDelete(id);

    revalidateTeamPages();

    return Response.json({ success: true });
  } catch (err) {
    const status = err.message.includes("Admin") || err.message.includes("Auth") ? 401 : 500;
    return Response.json({ success: false, error: err.message }, { status });
  }
}
