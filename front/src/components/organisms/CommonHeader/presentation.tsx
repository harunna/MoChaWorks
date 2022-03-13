import React from 'react';
import styled from '@emotion/styled';
import { ReactComponent as HomeIcon } from '../../../assets/img/icons/icon-home.svg';
import { ReactComponent as DarkModeIcon } from '../../../assets/img/icons/icon-dark-mode.svg';
import { Const } from '../../../lib/commonUtil';

function CommonHeader() {
  return (
    <Wrapper terminalCat="1">
      <AppName className="font-effect-emboss">
        MoChaWorks<AppIcon/>
      </AppName>
      <ModeIcon />
    </Wrapper>
  );
}

const Wrapper = styled.header<{ terminalCat: string }>`
  padding: 0px 20px 0px 40px;
  background-color: ${props => props.theme.color.PRIMARY};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${props => ({ terminalCat }) => 
  terminalCat === Const.TerminalCat.pc ? 
    props.theme.layout.header.default : 
      terminalCat === Const.TerminalCat.iPad ? 
        props.theme.layout.header.tablet :
          props.theme.layout.header.mobile}};

`;

const AppName = styled.div`
  color: ${props => props.theme.color.WHITE};
  font-weight: bold;
  display: flex;
  align-items: center;
  font-size: 30px;
`;

const AppIcon = styled(HomeIcon)`
  width: 30px;
  height: 30px;
  margin: 0px 5px;
  fill: #061B3A;
`;

const ModeIcon = styled(DarkModeIcon)`
  fill: #efffff;
`;

export default CommonHeader;

