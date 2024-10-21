import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // get the body of the request
  const body = await request.text();

  // verify webhook 
 


  revalidatePath('/posts');
}