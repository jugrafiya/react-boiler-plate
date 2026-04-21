import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useControl } from 'react-map-gl/mapbox';

const MapDrawControl = (props) => {
  const draw = useControl(
    ({ map }) => {
      map.on('draw.create', props.onCreate);
      map.on('draw.update', props.onUpdate);
      map.on('draw.delete', props.onDelete);
      map.on('draw.selectionchange', props.onSelectionChange);

      const drawInstance = new MapboxDraw({
        ...props,
        styles: props.styles || MapboxDraw.modes.styles
      });
      if (props.onInstanceCreated) {
        props.onInstanceCreated(drawInstance);
      }
      return drawInstance;
    },
    ({ map }) => {
      map.off('draw.create', props.onCreate);
      map.off('draw.update', props.onUpdate);
      map.off('draw.delete', props.onDelete);
      map.off('draw.selectionchange', props.onSelectionChange);
    },
    {
      position: props.position
    }
  );

  return null;
};

MapDrawControl.defaultProps = {
  displayControlsDefault: false,
  controls: {},
  defaultMode: 'simple_select'
};

export default MapDrawControl;
