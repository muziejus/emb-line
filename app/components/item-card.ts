import Component from "@glimmer/component";
import ItemModel from "emb-line/models/item";

interface ItemCardComponentSignature {
  Element: HTMLLIElement;
  Args: {
    item: ItemModel;
  }
}

export default class ItemCardComponent extends Component<ItemCardComponentSignature> {
  get collection() {
    return this.args.item.get("collection");
  }
}
