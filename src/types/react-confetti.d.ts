declare module 'react-confetti' {
    import { Component } from 'react';

    export interface ConfettiProps {
        width: number;
        height: number;
        numberOfPieces?: number;
        friction?: number;
        wind?: number;
        gravity?: number;
        colors?: string[];
        opacity?: number;
        recycle?: boolean;
        run?: boolean;
        confettiSource?: {
            x: number;
            y: number;
            w: number;
            h: number;
        };
    }

    export default class ReactConfetti extends Component<ConfettiProps> { }
}
