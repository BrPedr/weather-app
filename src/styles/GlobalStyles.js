import { createGlobalStyle } from "styled-components";

// I usually start a project by creating a style pattern that will be applied to the whole document
// Also, if it's needed that any further settings to be applied in a general manner, the global styles will make this easier
export default createGlobalStyle`
    * {
    // Resets any default margin
        margin: 0;
        padding: 0;
        outline: 0;
    // Prevents unecessary calculations of size by including the padding and border of the element to the total width and height
        box-sizing: border-box;
        
    // In this case, as I won't use another font, this will allow not to set the font again on other components
        font-family: 'Roboto', sans-serif;
    }

    // It's necessary to make sure that the HTML and the body fill the screen by choosing the 100% width and height;
    html, body, #root {
        width: 100%;
        height: 100%;
    }

    body {
        -webkit-font-smoothin: antialiased !important;
    }

    button, input { 
        border: 0;
        outline: 0;

        text-decoration: none;
    }

:root {
}
`;
