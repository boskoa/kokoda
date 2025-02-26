import styled from "styled-components";

const GroupLabelContainer = styled.span`
  position: relative;
  top: -1px;
  font-size: 10px;
  font-weight: 600;
  background-color: teal;
  padding: 3px;
  margin-left: 10px;
  border-radius: 5px;
`;

function GroupLabel() {
  return <GroupLabelContainer>Group</GroupLabelContainer>;
}

export default GroupLabel;
