import type { Meta, StoryObj } from '@storybook/react';
import { CheckBox } from './CheckBox';

const meta = {
  title: 'Components/CheckBox',
  component: CheckBox,
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
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
};
