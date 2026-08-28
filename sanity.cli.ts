import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  /**
   * Studio is served by Next.js at /studio, not deployed to *.sanity.studio.
   */
  autoUpdates: false,
});
