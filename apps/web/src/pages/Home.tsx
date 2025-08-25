'use client';

import {
  Button,
  ButtonPrimary,
  CheckBox,
  InputContainer,
  Modal,
  NumberInput,
  TextArea,
  ToastContainer,
  ToggleSwitch,
} from '@ui';
import AlertPopupContainer from '@ui/components/overlay/AlertPopup/Container';
import useAlertPopupStore from '@ui/components/overlay/AlertPopup/store';
import ModalContainer from '@ui/components/overlay/ModalPortal';
import useToastMessageStore from '@ui/components/overlay/ToastMessage/store';
import { useState } from 'react';

export default function Home() {
  const [checked, setChecked] = useState(false);
  const toastMessageStore = useToastMessageStore();
  const alertPopupStore = useAlertPopupStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [numberValue, setNumberValue] = useState(100000000);
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="w-48"
        onClick={() => {
          toastMessageStore.create('hi');
        }}
      >
        hi
      </Button>
      <ButtonPrimary
        onClick={async () => {
          alertPopupStore.create({
            type: 'confirm',
            content: 'hi',
          });
          // setTimeout(() => {
          //   alertPopupStore.create({
          //     title: '확인해봅시다',
          //     type: 'confirm',
          //     content: 'hi1',
          //   });
          // }, 1000);
          // setTimeout(() => {
          //   alertPopupStore.create({
          //     type: 'alert',
          //     content: 'hi2',
          //   });
          // }, 2000);
        }}
      >
        hi
      </ButtonPrimary>
      <ToggleSwitch
        checked={isModalOpen}
        onChange={(e) => {
          setIsModalOpen(e.target.checked);
        }}
      />
      <CheckBox
        checked={checked}
        onChange={(e) => {
          console.log(e.target.checked);
          setChecked(e.target.checked);
        }}
      />
      <InputContainer>
        <NumberInput value={numberValue} setValue={setNumberValue} />
      </InputContainer>
      <InputContainer>
        <TextArea value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)} />
      </InputContainer>
      <AlertPopupContainer />
      <ToastContainer />
      <ModalContainer isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isDirectClose={false}>
        <Modal title="test">
          <div className="w-96 h-96 text-red-500">dd</div>
        </Modal>
      </ModalContainer>
    </div>
  );
}
