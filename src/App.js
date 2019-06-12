import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import HeaderText from "./styles/HeaderText";
import { Header, Button, Segment, Icon, Card, Grid } from "semantic-ui-react";

function App() {
  const [
    repos,
    setRepos
  ] = useState([]);

  useEffect(() => {
    // API rate limits and hot reloading dont mix
    // getRepos();
  }, []);

  const getRepos = () => {
    axios.get("https://api.github.com/users/agarcian031/repos?sort=created").then((res) => setRepos(res.data));
  };

  return (
    <AppContainer>
      <Button onClick={getRepos}>Get Repos</Button>
      <Header as={HeaderText} fSize="large">
        My Portfolio
      </Header>
      <Segment as={Transparent}>
        <Header as={HeaderText}> My Projects</Header>
        <Grid>
          <Grid.Row>
            {repos.map((r) => (
              <Grid.Column key={r.id} width={4}>
                <StyledCard>
                  <Card.Content>
                    <Card.Header>{r.full_name}</Card.Header>
                    <Card.Meta>{r.description}</Card.Meta>
                  </Card.Content>
                </StyledCard>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment as={Transparent}>
        <Header as={HeaderText}>Contact</Header>
      </Segment>
    </AppContainer>
  );
}

const Truncated = styled.div`
  width: 250px; 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
`;

const StyledCard = styled(Card)`
    height: 200px; 

`;

const AppContainer = styled.div`
  background: #0f0c29; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #24243e, #302b63, #0f0c29); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const Transparent = styled.div`background: transparent !important;`;

export default App;
