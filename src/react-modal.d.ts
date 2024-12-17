declare module 'react-modal' {
    import { Component } from 'react';

    interface ModalProps {
        isOpen: boolean;
        onRequestClose: () => void;
        contentLabel?: string;
        children?: React.ReactNode; 
        
    }

    export default class Modal extends Component<ModalProps> {}
}
