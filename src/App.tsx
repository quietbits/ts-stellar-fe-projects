/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Heading, Layout, Link, Icon, Title } from "@stellar/design-system";

import { GITHUB_RAW_PATH } from "./settings/constants";
import { projects } from "./settings/projects";
import { sectionData } from "./settings/sectionData";

function parsePackageJson(packageJson: any) {
  const allDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies,
  };

  const sections = sectionData.reduce((res, cur) => {
    const packages = cur.packages.reduce((pRes, pCur) => {
      if (pCur === "nodeVersion" && packageJson?.engines?.node) {
        return [
          ...pRes,
          { package: "node", version: packageJson?.engines?.node },
        ];
      }

      if (allDependencies[pCur]) {
        return [...pRes, { package: pCur, version: allDependencies[pCur] }];
      }

      return pRes;
    }, [] as any);

    return [...res, { ...cur, packages }];
  }, [] as any);

  return sections;
}

const Section = ({ section }: { section: any }) => {
  return (
    <div className="Project__section">
      <Title size="sm">{section.title}</Title>
      <div className="Project__section__packages">
        {section.packages.map((p: any) => (
          <div className="Project__package" key={p.package}>
            <Link
              href={`https://www.npmjs.com/package/${p.package}`}
              variant="secondary"
            >
              {p.package}
            </Link>{" "}
            <span className="Project__package__version">{p.version}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PackageInfo = ({
  baseUrl,
  workspaces,
}: {
  baseUrl: string;
  workspaces?: string[];
}) => {
  const [info, setInfo] = useState<any>();
  const [workspacesInfo, setWorkspacesInfo] = useState<any>();

  useEffect(() => {
    async function fetchInfo() {
      async function fetchPackageJsonFile(url: string) {
        const file = await fetch(url);
        const fileJson = await file.json();

        return parsePackageJson(fileJson);
      }

      if (baseUrl) {
        const parsedInfo = await fetchPackageJsonFile(
          `${baseUrl}/package.json`,
        );
        setInfo(parsedInfo);
      }

      if (workspaces?.length) {
        const wsInfo: any = {};

        for (let i = 0; i < workspaces.length; i++) {
          const wsParsedInfo = await fetchPackageJsonFile(
            `${baseUrl}/${workspaces[i]}/package.json`,
          );
          wsInfo[workspaces[i]] = wsParsedInfo;
        }

        setWorkspacesInfo(wsInfo);
      }
    }

    fetchInfo();
  }, [baseUrl, workspaces]);

  if (!info) {
    return null;
  }

  return (
    <>
      {/* Root package.json */}
      <div className="Project__packages">
        {info.map((section: any) => {
          if (!section.packages.length) {
            return null;
          }

          return <Section section={section} key={`root-${section.id}`} />;
        })}
      </div>

      {/* Workspaces / sub-projects */}
      {workspacesInfo ? (
        <div>
          {Object.entries(workspacesInfo).map(([ws, sections]) => (
            <div className="Project__workspace" key={ws}>
              <Heading as="h3" size="xs">
                <Icon.ChevronDoubleRight /> {ws}
              </Heading>

              <div className="Project__packages">
                {(sections as any).map((section: any) => {
                  if (!section.packages.length) {
                    return null;
                  }

                  return (
                    <Section section={section} key={`${ws}-${section.id}`} />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

function App() {
  return (
    <>
      <Layout.Header
        projectId="stellar-fe-projects"
        projectTitle="FE Projects"
        hasThemeSwitch
      />
      <Layout.Content>
        <Layout.Inset>
          <Heading as="h1" size="md">
            Frontend Projects
          </Heading>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            repudiandae tenetur velit quisquam voluptatibus voluptate fugiat
            veniam earum dolores, vitae explicabo laborum eum impedit saepe
            exercitationem sit delectus. Laboriosam, alias.
          </p>

          <div className="Resources">
            <Heading as="h2" size="sm">
              Resources
            </Heading>

            <ul>
              <li>
                <Link href="https://github.com/nodejs/Release?tab=readme-ov-file#release-schedule">
                  Node.js release schedule
                </Link>
              </li>
            </ul>
          </div>

          <div className="ProjectList">
            {projects.map((p) => (
              <Link key={`link-${p.id}`} href={`#${p.id}`}>
                {p.name}
              </Link>
            ))}
          </div>

          <div className="ProjectsWrapper">
            {projects.map((p) => (
              <div className="Project" key={p.id} id={p.id}>
                <div className="Project__header">
                  <Heading as="h2" size="sm">
                    {p.name}
                  </Heading>

                  <div className="Project__header__links">
                    <code title="Default branch">{p.defaultBranch}</code>
                    <Link href={p.repo} title="GitHub repo">
                      <Icon.Github />
                    </Link>
                    <Link href={p.website} title="Website link">
                      <Icon.Link />
                    </Link>
                  </div>
                </div>

                {p.note ? <p>{p.note}</p> : null}

                <PackageInfo
                  baseUrl={`${GITHUB_RAW_PATH}/${p.id}/${p.defaultBranch}`}
                  workspaces={p.workspaces}
                />
              </div>
            ))}
          </div>
        </Layout.Inset>
      </Layout.Content>
      <Layout.Footer gitHubLink="https://github.com/quietbits/ts-stellar-fe-projects" />
    </>
  );
}

export default App;
