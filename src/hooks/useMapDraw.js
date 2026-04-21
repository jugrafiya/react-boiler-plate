import { useState, useCallback, useRef } from 'react';

/**
 * Custom hook to manage Mapbox Draw state and events.
 * Designed to be extensible for future API integrations.
 */
export const useMapDraw = ({
  onDrawCreate,
  onDrawUpdate,
  onDrawDelete,
  onSelectionChange,
  resetMode = () => { }
} = {}) => {
  const [features, setFeatures] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const drawRef = useRef(null);

  // Callback when features are created
  const handleCreate = useCallback((e) => {
    const newFeatures = e.features;
    setFeatures(prev => [...prev, ...newFeatures]);
    if (onDrawCreate) onDrawCreate(newFeatures);
    resetMode?.()
  }, [onDrawCreate]);

  // Callback when features are updated
  const handleUpdate = useCallback((e) => {
    const updatedFeatures = e.features;
    setFeatures(prev =>
      prev.map(f => {
        const updated = updatedFeatures.find(uf => uf.id === f.id);
        return updated || f;
      })
    );
    if (onDrawUpdate) onDrawUpdate(updatedFeatures);
    resetMode?.()
  }, [onDrawUpdate]);

  // Callback when features are deleted
  const handleDelete = useCallback((e) => {
    const deletedIds = e.features.map(f => f.id);
    setFeatures(prev => prev.filter(f => !deletedIds.includes(f.id)));
    if (onDrawDelete) onDrawDelete(e.features);
  }, [onDrawDelete]);

  // Callback when selection changes (Edit Mode detection)
  const handleSelectionChange = useCallback((e) => {
    const ids = e.features.map(f => f.id);
    setSelectedIds(ids);
    if (onSelectionChange) onSelectionChange(e.features);
    resetMode?.()
  }, [onSelectionChange]);

  const setDrawInstance = (instance) => {
    drawRef.current = instance;
  };

  const changeMode = (mode, options = {}) => {
    if (drawRef.current) {
      drawRef.current.changeMode(mode, options);
    }
  };

  const deleteSelected = () => {
    if (drawRef.current) {
      drawRef.current.trash();
    }
  };

  return {
    features,
    selectedIds,
    setDrawInstance,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleSelectionChange,
    changeMode,
    deleteSelected,
    drawInstance: drawRef.current
  };
};
