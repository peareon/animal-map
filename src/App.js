import DisplayInfo from "./components/DisplayInfo";
import Header from "./components/Header";
import Information from "./components/Information";
import SearchBar from "./components/Searchbar";
import { MainContainer, OverviewContainer, TitleSearchContainer } from "./styles/styles";
import GlobalStyle from "./styles/globalStyles";
import { Route, Routes } from "react-router-dom";
import CompleteDescription from "./components/CompleteDescription";
import AppInfo from "./components/AppInfo";
import AppDetails from "./components/AppDetails";
function App() {

  
  return (
    <>
    <GlobalStyle/>
    <Routes>
      <Route path = '/' element = { 
        <MainContainer>
          <OverviewContainer>
            <TitleSearchContainer>
              <Header/>
              <SearchBar/>
            </TitleSearchContainer>
            <Information/>
            <AppInfo/>
          </OverviewContainer>
          <DisplayInfo/>
        </MainContainer>
      } />
      <Route path= '/speciesInfo' element={
        <MainContainer>
          <OverviewContainer>
              <TitleSearchContainer>
                <Header/>
              </TitleSearchContainer>
              <Information/>
          </OverviewContainer>
          <CompleteDescription />
        </MainContainer> 
      }/>
      <Route path= '/appInfo' element={
        <MainContainer>
          <OverviewContainer>
              <TitleSearchContainer>
                <Header/>
              </TitleSearchContainer>
              <Information/>
          </OverviewContainer>
          <AppDetails/>
        </MainContainer> 
      }/>
    </Routes>
    </>
  );
}

export default App;
