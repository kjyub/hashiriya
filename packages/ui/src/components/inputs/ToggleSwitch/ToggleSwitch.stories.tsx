import type { Meta, StoryObj } from '@storybook/react';
import { ToggleSwitch } from './ToggleSwitch';

const meta = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '피그마 토글스위치(Default / Hover / Active / Focus / Disabled) 상태를 그대로 인터랙션으로 확인합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof ToggleSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
};
