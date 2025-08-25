import type { Meta, StoryObj } from '@storybook/react';
import { InputContainer } from './InputContainer';

const meta = {
  title: 'Components/InputContainer',
  component: InputContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'InputContainer',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    children: <input type="text" placeholder="Placeholder" />,
  },
};
