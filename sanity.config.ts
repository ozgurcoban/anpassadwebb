"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { resolve } from "@/sanity/presentation/resolve";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

// const blogLocation = {
//   title: 'Blog',
//   href: '/blog',
// } satisfies DocumentLocation;

// const SANITY_STUDIO_PREVIEW_URL =
//   // TODO
//   // Change site on production
//   process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000';

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    // add types
    types: schema.types,
  },
  plugins: [
    presentationTool({
      resolve,
      // Required: set the base URL to the preview location in the front end
      previewUrl: {
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      // resolve: {
      //   locations: {},
      // },
      // from sanity docs
      // resolve: {
      //   locations: {
      //     settings: defineLocations({
      //       locations: [blogLocation],
      //     }),
      //   },
      //   // mainDocuments: defineDocuments([
      //   //   {
      //   //     route: 'localhost:3000/blog',
      //   //     filter: `_type == "post" && slug.current == $slug`,
      //   //   },
      //   // ]),
      // },
    }),
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
