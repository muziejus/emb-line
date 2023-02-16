import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class NeatlineFilter extends Service {
  @tracked afterYear = 1971;

  @tracked beforeYear = 0;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module "@ember/service" {
  interface Registry {
    "neatline-filter": NeatlineFilter;
  }
}
