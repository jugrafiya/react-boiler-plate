import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useControl } from 'react-map-gl/mapbox';
import { useRef } from 'react';

const MapDrawControl = (props) => {
  const propsRef = useRef(props);
  propsRef.current = props;
  const eventsRef = useRef({});

  const draw = useControl(
    ({ map }) => {
      eventsRef.current.onCreate = (e) => propsRef.current.onCreate?.(e);
      eventsRef.current.onUpdate = (e) => propsRef.current.onUpdate?.(e);
      eventsRef.current.onDelete = (e) => propsRef.current.onDelete?.(e);
      eventsRef.current.onSelectionChange = (e) => propsRef.current.onSelectionChange?.(e);

      map.on('draw.create', eventsRef.current.onCreate);
      map.on('draw.update', eventsRef.current.onUpdate);
      map.on('draw.delete', eventsRef.current.onDelete);
      map.on('draw.selectionchange', eventsRef.current.onSelectionChange);

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
      map.off('draw.create', eventsRef.current.onCreate);
      map.off('draw.update', eventsRef.current.onUpdate);
      map.off('draw.delete', eventsRef.current.onDelete);
      map.off('draw.selectionchange', eventsRef.current.onSelectionChange);
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
