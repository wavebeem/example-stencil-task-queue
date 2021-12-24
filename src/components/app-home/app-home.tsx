import { Component, h, Host, State } from "@stencil/core";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
  shadow: true,
})
export class AppHome {
  @State() page = 0;

  render() {
    const items = getItems({ pageSize: 4, page: this.page });
    return (
      <Host>
        <div class="flex">
          <my-button
            onClick={() => {
              this.page = Math.max(0, this.page - 1);
            }}
          >
            Prev
          </my-button>
          <p>Page {this.page + 1}</p>
          <my-button
            onClick={() => {
              this.page++;
            }}
          >
            Next
          </my-button>
        </div>
        <div class="grid">
          {items.map((item) => {
            return (
              <my-card key={item.id}>
                <div class="flex">
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                  <my-button aria-label={`Edit ${item.title}`}>Edit</my-button>
                </div>
              </my-card>
            );
          })}
        </div>
      </Host>
    );
  }
}

function getItems({
  pageSize,
  page,
}: {
  pageSize: number;
  page: number;
}): Item[] {
  const offset = page * pageSize;
  return Array.from({ length: pageSize }, (_, i) => {
    const n = offset + i + 1;
    return {
      id: String(n),
      title: `Item ${n}`,
      description: `Item ${n} is a very cool item. Please consider editing the item.`,
    };
  });
}

interface Item {
  id: string;
  title: string;
  description: string;
}
