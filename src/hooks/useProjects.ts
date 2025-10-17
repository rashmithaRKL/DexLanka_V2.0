import { useState, useEffect } from 'react';
import { ProjectDetails, getProjectById, projectDetails } from '@/data/projects';

export const useProjects = () => {
  const [projects, setProjects] = useState<ProjectDetails[]>(projectDetails);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      // In the future, this could fetch from Supabase
      // const data = await getProjects();
      // setProjects(data);
      setProjects(projectDetails);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const addProject = (project: Omit<ProjectDetails, 'id'>) => {
    const newProject: ProjectDetails = {
      ...project,
      id: Math.max(...projects.map(p => p.id)) + 1
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: number, updates: Partial<ProjectDetails>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
  };

  const deleteProject = (id: number) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    addProject,
    updateProject,
    deleteProject
  };
};

export const useProjectById = (id: number) => {
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const foundProject = getProjectById(id);
        setProject(foundProject || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  return { project, loading, error };
};
