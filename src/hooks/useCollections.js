import { useState, useEffect } from 'react';

const COLLECTIONS_KEY = 'userCollections';

export const useCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(COLLECTIONS_KEY);
    if (stored) {
      try {
        setCollections(JSON.parse(stored));
      } catch {
        setCollections([]);
      }
    }
  }, []);

  const saveCollections = (data) => {
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(data));
    setCollections(data);
  };

  const createCollection = (collection) => {
    const newCollection = {
      ...collection,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      resources: []
    };
    const updated = [...collections, newCollection];
    saveCollections(updated);
    return newCollection;
  };

  const updateCollection = (id, data) => {
    const updated = collections.map(col => 
      col.id === id ? { ...col, ...data } : col
    );
    saveCollections(updated);
  };

  const deleteCollection = (id) => {
    const updated = collections.filter(col => col.id !== id);
    saveCollections(updated);
  };

  const addToCollection = (collectionId, resourceId) => {
    const updated = collections.map(col => {
      if (col.id === collectionId) {
        const resources = col.resources || [];
        if (!resources.includes(resourceId)) {
          return { ...col, resources: [...resources, resourceId] };
        }
      }
      return col;
    });
    saveCollections(updated);
  };

  const removeFromCollection = (collectionId, resourceId) => {
    const updated = collections.map(col => {
      if (col.id === collectionId) {
        return { 
          ...col, 
          resources: (col.resources || []).filter(id => id !== resourceId)
        };
      }
      return col;
    });
    saveCollections(updated);
  };

  const getCollection = (id) => {
    return collections.find(col => col.id === id);
  };

  const getCollectionsForResource = (resourceId) => {
    return collections.filter(col => 
      (col.resources || []).includes(resourceId)
    );
  };

  return {
    collections,
    createCollection,
    updateCollection,
    deleteCollection,
    addToCollection,
    removeFromCollection,
    getCollection,
    getCollectionsForResource
  };
};

export default useCollections;