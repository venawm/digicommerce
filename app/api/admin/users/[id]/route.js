export async function DELETE(request, { params }) {
  const { id } = params;

  await dbConnect();

  try {
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the user's email is "pandesamir3@gmail.com"
    if (user.email === "pandesamir3@gmail.com") {
      return NextResponse.json(
        { message: "Cannot update role for this user" },
        { status: 400 }
      );
    }

    // Update role only if the user's email is not "pandesamir3@gmail.com"
    await User.findByIdAndUpdate(id, { role: "user" });

    return NextResponse.json({ message: "User role updated successfully" });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
