import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "hashiriya",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#1a1a1a",
        },
        {
          name: "hashiriya",
          value: "linear-gradient(135deg, #201A3A 0%, #20217C 100%)",
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="font-paperlogy">
        <Story />
      </div>
    ),
  ],
};

export default preview;
