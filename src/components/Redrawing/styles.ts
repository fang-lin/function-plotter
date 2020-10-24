import styled, {createGlobalStyle} from 'styled-components';

export const DrawingWrapper = styled.div<{ redrawing: boolean }>`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: ${({redrawing}): string => redrawing ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, .3);
    transition: all .3s;
`;

export const DrawingGooeyBackground = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 142px;
    height: 40px;
    background: white;
    box-shadow: 0 0 40px 40px white;
`;

export const DrawingGooey = styled.div`
    width: 142px;
    height: 40px;
    background: white;
    filter: contrast(20);
    .dot {
        position: absolute;
        width: 16px;
        height: 16px;
        top: 12px;
        left: 15px;
        filter: blur(4px);
        background: #000;
        border-radius: 50%;
        transform: translateX(0);
        animation: dot 2.8s infinite;
    }
    .dots {
        transform: translateX(0);
        margin-top: 12px;
        margin-left: 31px;
        animation: dots 2.8s infinite;
        span {
            display: block;
            float: left;
            width: 16px;
            height: 16px;
            margin-left: 16px;
            filter: blur(4px);
            background: #000;
            border-radius: 50%;
        }
    }
`;

export const KeyframesStyle = createGlobalStyle`
    @keyframes dot {
        50% {
            transform: translateX(96px);
        }
    }
    @keyframes dots {
        50% {
            transform: translateX(-31px);
        }
    }
`;