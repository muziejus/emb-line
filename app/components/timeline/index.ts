import Component from "@glimmer/component";
import NeatlineRecord from "emb-line/models/neatline-record";
import { scaleLinear, scaleBand } from "d3-scale";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

interface TimelineComponentSignature {
  Args: {
    records: NeatlineRecord[];
    defaultYear?: number;
  };
}

interface TimelineRecord extends NeatlineRecord {
  numAfterDate?: number;
  numBeforeDate?: number;
}

export default class TimelineComponent extends Component<TimelineComponentSignature> {
  @tracked svgWidth = 0;

  @tracked svgHeight = 100;

  margins = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 30,
  };

  @action calculateTimelineSvgSize({ contentRect }) {
    this.svgWidth = contentRect.width;
    this.svgHeight = contentRect.height;
  }

  get defaultYear() {
    if (this.args.defaultYear) {
      return this.args.defaultYear;
    }

    return this.records.map(record => record.numAfterDate).sort()[0];
    // return 1969;
  }

  get records() {
    return this.args.records
      .map(record => {
        if (record.afterDate) {
          record.numAfterDate = +record.afterDate;
        }
        if (record.beforeDate) {
          record.numBeforeDate = +record.beforeDate;
        }

        return record as TimelineRecord;
      })
      .sort((a, b) => a.numAfterDate - b.numAfterDate);
  }

  get scale() {
    return scaleLinear()
      .domain([this.defaultYear - 2, 2023])
      .range([0, this.svgWidth]);
  }

  get bandScale() {
    return scaleBand()
      .domain([0, 1, 2, 3, 4])
      .range([this.margins.top, this.svgHeight - this.margins.bottom])
      .padding(0.1);
  }
}
