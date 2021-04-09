import { PanelPlugin } from '@grafana/data';
import { Options } from './types';
import { MapPanel } from './MapPanel';

export const plugin = new PanelPlugin<Options>(MapPanel).setPanelOptions(builder => {
  builder
    .addTextInput({
      path: 'apiKey',
      name: 'API Key',
      description: 'Google Maps API key',
    })
    .addNumberInput({
      path: 'zoom',
      name: 'Default zoom level',
      description: 'Initial zoom level for when page loads',
      defaultValue: 10,
      settings: {
        min: 1,
        max: 20,
        step: 1,
      },
    })
    .addNumberInput({
      path: 'lat',
      name: 'Initial latitude',
      description: 'Initial latitude level for when page loads',
      defaultValue: 51.506997972,
    })
    .addNumberInput({
      path: 'long',
      name: 'Initial longitude',
      description: 'Initial longitude for when page loads',
      defaultValue: 0.123166174,
    })
    .addBooleanSwitch({
      path: 'showValueByColor',
      name: 'Show value by Color',
      defaultValue: true,
      category: ['Value'],
    })
    .addUnitPicker({
      path: 'unit',
      name: 'Unit',
      category: ['Value'],
    })
    .addBooleanSwitch({
      path: 'showValueOnLabel',
      name: 'Show value on labels',
      category: ['Value'],
    })
    .addNumberInput({
      path: 'minThreshold',
      name: 'Minimum threshold',
      description: 'Minimum threshold value for marker color',
      defaultValue: 0,
      category: ['Value'],
    })
    .addNumberInput({
      path: 'maxThreshold',
      name: 'Maximum threshold',
      description: 'Maximum threshold value for marker color',
      defaultValue: 100,
      category: ['Value'],
    });

  const queryConfig = [
    { name: 'A', icon: 'fa fa-map-marker' },
    { name: 'B', icon: 'fa fa-map-pin' },
    { name: 'C', icon: 'fa fa-street-view' },
    { name: 'D', icon: 'fa fa-thermometer-full' },
    { name: 'E', icon: 'fa fa-user-o' },
    { name: 'F', icon: 'fa fa-coffee' },
    { name: 'G', icon: 'fa fa-university' },
    { name: 'H', icon: 'fa fa-thumbs-up' },
    { name: 'I', icon: 'fa fa-wifi' },
    { name: 'J', icon: 'fa fa-thumb-tack' },
  ];

  queryConfig.forEach(el => {
    builder.addTextInput({
      path: 'icons[' + el.name + ']',
      name: 'Query ' + el.name + ': Font Awesome icon',
      defaultValue: el.icon,
      category: ['Marker Icons'],
    });
  });

  return builder;
});
