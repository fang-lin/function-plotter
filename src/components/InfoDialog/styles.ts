import styled from 'styled-components';
import {DialogBackground} from '../Dialog/styles';
import informationIcon from '../../images/icons/information.png';
import {device} from '../../pages/Home/styles';

export const Info = styled.div`
    margin: 0 30px;
    @media ${device.tablet} { 
        margin: 0;
    }
    h3{
        margin: 8px 0;
    }
    p{
        margin: 8px 0;
    }
`;

export const InfoDialogBackground = styled(DialogBackground)`
    display: block;
    @media ${device.tablet} { 
        display: flex;
    }
`;
