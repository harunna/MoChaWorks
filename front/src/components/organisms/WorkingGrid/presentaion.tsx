import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridData } from '../../../reducers/attendance';
import styled from '@emotion/styled';

type Props = {
  workingList: GridData;
}

function WorkingGrid(props: Props) {
  const { workingList } = props;

  return (
    <Container>
      <DataGrid
        classes={{ columnHeader: 'working-column-header' }}
        rows={workingList.rows}
        columns={workingList.columns}
        checkboxSelection={false}
        disableSelectionOnClick
        hideFooter
        showCellRightBorder
        headerHeight={35}
        rowHeight={32}
        editMode='row'
      />
    </Container>
  );
}

const Container = styled.div`
  height: 472px;
  width: calc(100% - 30px);
  margin: 0 auto;
  .working-column-header {
    background-color: #AAA;
    color: ${props => props.theme.color.WHITE};
  }
`;
export default WorkingGrid;