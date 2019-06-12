import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
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
      <StyledButton onClick={getRepos}>Get Repos</StyledButton>
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
                    <Truncated>
                      <Card.Header>{r.full_name}</Card.Header>
                    </Truncated>
                    <Card.Meta>{r.description}</Card.Meta>
                    {r.stargazers_count > 0 && (
                      <Star>
                        <Icon name="star" />
                      </Star>
                    )}
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

const StyledButton = styled.div`
  display: flex;
  background: #fff;
  border: 3px solid aliceblue; 
  border-radius: 5px; 
  color: #312d2d;
  padding: 15px 25px;
  justify-content: center;
  transition: background 0.2s ease;
  cursor: pointer;
  width: 200px; 
  
  &:hover {
    background: #606060;
    transition: background 0.2s ease;
  }
`;

const rotate360 = keyframes`
  from {
    tranform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Star = styled.div`
  display: inline-block;
  color: yellow;
  text-shadow: 1px 1px 1px black;
  animation: ${rotate360} 2s linear infinite;
`;

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
