import { Layout } from "@stellar/design-system";
import "./App.scss";

function App() {
  return (
    <>
      <Layout.Header
        projectId="stellar-fe-projects"
        projectTitle="FE Projects"
        hasThemeSwitch
      />
      <Layout.Content>
        <Layout.Inset>Content</Layout.Inset>
      </Layout.Content>
      <Layout.Footer gitHubLink="https://github.com/quietbits/ts-stellar-fe-projects" />
    </>
  );
}

export default App;
