import {Header} from "./Component/Header/Header";

import Footer from "./Component/Footer/Footer";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {PageContainer} from "./Component/PageContainer";
import {HomePage} from "./Component/HomePage/HomePage";
import MovieDetails from "./Component/MovieDetails/MovieDetails";
import { SearchContent } from "./Component/SearchMovies/SearchContent";
import {Page404} from "./Component/Page404/Page404";



function App() {
    return (
        <BrowserRouter>
            <Header/>
            <PageContainer>
                <Switch>
                    <Route path='/' exact>
                        <HomePage/>
                    </Route>
                    <Route path='/movies' exact>
                        <SearchContent/>
                    </Route>
                    <Route path='/movies/:id'>
                        <MovieDetails/>
                    </Route>
                    <Page404/>
                </Switch>
            </PageContainer>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
