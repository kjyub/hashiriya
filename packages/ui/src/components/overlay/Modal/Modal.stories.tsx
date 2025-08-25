import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인에 맞춘 Modal 컴포넌트입니다. gradient 배경과 border를 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Modal의 제목',
    },
    children: {
      control: { type: 'text' },
      description: 'Modal 내부 컨텐츠',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Modal Title',
    children: 'Modal 내용이 여기에 표시됩니다.',
  },
  decorators: [(Story, { args }) => <Story args={{ ...args, className: 'w-96 h-80' }} />],
};

export const WithCustomTitle: Story = {
  args: {
    title: '사용자 정의 제목',
    children: '커스텀 제목이 있는 Modal입니다.',
  },
  decorators: [(Story, { args }) => <Story args={{ ...args, className: 'w-96 h-80' }} />],
};

export const WithRichContent: Story = {
  args: {
    title: 'Rich Content Modal',
    children: (
      <div>
        <p className="text-white mb-4">이 Modal에는 다양한 컨텐츠가 포함되어 있습니다.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">액션 버튼</button>
      </div>
    ),
  },
  decorators: [
    (Story, { args }) => (
      <div style={{ backgroundColor: '#1a1a2e', padding: '20px' }}>
        <Story args={{ ...args, className: 'w-[500px] h-96' }} />
      </div>
    ),
  ],
};
