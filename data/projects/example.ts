// Example of how to add a new project to the data structure

import { ProjectData } from "../../lib/project.type";

const newProject: ProjectData = {
    name: "Project Name",
    tagline: "Brief tagline describing the project",
    description: "Detailed description of what the project does and why it's useful.",
    features: [
        "Feature 1 description",
        "Feature 2 description",
        "Feature 3 description"
    ],
    techStack: [
        "Technology 1",
        "Technology 2",
        "Framework",
        "Language"
    ],
    installationSteps: [
        "Step 1: Do something",
        "Step 2: Do something else",
        "Step 3: Final step"
    ],
    links: {
        downloadLink: "https://example.com/download",
        githubLink: "https://github.com/codershubinc/project-name",
        readmeLink: "https://github.com/codershubinc/project-name/blob/main/README.md",
        changelogLink: "https://github.com/codershubinc/project-name/blob/main/CHANGELOG.md" // Optional
    },
    creator: {
        login: "codershubinc",
        id: "90494823",
        node_id: "MDQ6VXNlcjkwNDk0ODIz",
        avatar_url: "https://avatars.githubusercontent.com/u/90494823?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/codershubinc",
        html_url: "https://github.com/codershubinc"
    },
    // Optional fields:
    screenshots: [
        "path/to/screenshot1.png",
        "path/to/screenshot2.png"
    ],
    ideaBehindIt: "Explanation of the inspiration and motivation behind the project",
    futurePlans: [
        "Planned feature 1",
        "Planned feature 2"
    ],
    contributors: [
        {
            login: "contributor1",
            id: "12345",
            node_id: "MDQ6VXNlcjEyMzQ1",
            avatar_url: "https://avatars.githubusercontent.com/u/12345?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/contributor1",
            html_url: "https://github.com/contributor1"
        }
    ]
};

export default newProject;