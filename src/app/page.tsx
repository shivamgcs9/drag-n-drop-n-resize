"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;

  @media (min-width: 640px) {
    font-size: 2.5rem;
  }

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Button = styled.button`
  background-color: #1d4ed8;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1e40af;
  }
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  padding: 0;
  list-style: none;

  @media (min-width: 640px) {
    gap: 1.5rem;
  }
`;

const ListItem = styled.li`
  flex: 1 1 calc(50% - 1rem);
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.375rem;
  text-align: center;
  color: #1d4ed8;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #e2e8f0;
    color: #1e40af;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-size: 1.25rem;

    @media (min-width: 640px) {
      font-size: 1.5rem;
    }

    @media (min-width: 768px) {
      font-size: 1.75rem;
    }
  }
`;

const HomePage = () => {
  const [projects, setProjects] = useState<string[]>([]);

  useEffect(() => {
    const storedProjects = JSON.parse(
      localStorage.getItem("categories") || "[]"
    );
    setProjects(storedProjects);
  }, []);

  const addProject = () => {
    const project = prompt("Enter new category name:");
    if (project) {
      const updatedProjects = [...projects, project];
      setProjects(updatedProjects);
      localStorage.setItem("categories", JSON.stringify(updatedProjects));
    }
  };

  return (
    <Container>
      <Title>All Projects</Title>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <Button onClick={addProject}>Add Project</Button>
      </div>
      {projects.length === 0 ? (
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p>Welcome! Start by adding a new project.</p>
        </div>
      ) : (
        <List>
          {projects.map((project) => (
            <ListItem key={project}>
              <Link href={`/projects/${project}`}>{project}</Link>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default HomePage;
