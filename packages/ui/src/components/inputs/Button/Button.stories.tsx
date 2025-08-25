import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "피그마 버튼(Default / Hover / Active / Focus / Disabled) 상태를 그대로 인터랙션으로 확인합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default",
  },
};
