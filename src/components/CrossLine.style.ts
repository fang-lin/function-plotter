import styled from 'styled-components';

export const Line = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
`;

export const LineX = styled(Line)`
    height: 0;
    width: 1px;
    background: rgba(0, 0, 0, 0.3);
`;

export const LineY = styled(Line)`
    width: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.3);
`;
