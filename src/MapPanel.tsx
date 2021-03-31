import React from 'react';
import { DataFrame, DataFrameView, PanelProps } from '@grafana/data';
import { Options } from 'types';
import { css, cx } from 'emotion';
import GoogleMapReact  from 'google-map-react';
import { getValueFormat, formattedValueToString } from '@grafana/data';
const colorBetween = require('color-between');

interface Props extends PanelProps<Options> {}

export class MapPanel extends React.Component<Props> {
  private map?: GoogleMapReact;
  private markers: google.maps.Marker[] = [];
  private circles: google.maps.Circle[] = [];

  initialize(map: GoogleMapReact) {
    this.map = map;
    this.renderMarkers();
  }

  componentDidUpdate() {
    this.renderMarkers();
  }

  renderMarkers() {
    let map = this.map;
    let MarkerWithLabel = require('markerwithlabel')(google.maps);

    this.clearMap();

    this.props.data.series.forEach((row: DataFrame) => {

      const view = new DataFrameView(row);
      view.forEach(item => {
        const color = this.props.options.showValueByColor
          ? colorBetween(
              '#F00',
              '#008000',
              this.transformRange(item.value, this.props.options.minThreshold, this.props.options.maxThreshold, 0, 1),
              'hex'
            )
          : '#EE0000';

        const marker = new MarkerWithLabel({
          map,
          position: { lat: item.lat, lng: item.long },
          title: item.metric +
            (this.props.options.showValueOnLabel
              ? ': ' + formattedValueToString(getValueFormat(this.props.options.unit)(item.value))
              : ''),
          icon: ' ',
          labelContent: '<i class="fa ' + this.props.options.icons[row.refId] + ' fa-3x" style="color:rgba(167,0,0,0.8); padding-left:2 px;"></i>',
          labelAnchor: new google.maps.Point(12, 36),
          zIndex: 20
        });

        if (item.info) {
          marker.addListener("click", () => {
            new google.maps.InfoWindow({
              content: item.info,
            }).open(map, marker);
          });
        }

        this.markers.push(marker);

        if (item.hasOwnProperty('radius')) {
          const circle = new google.maps.Circle({
            map: this.map,
            radius: item.radius, // meters
            strokeWeight: 1,
            strokeColor: '#000',
            fillColor: color,
            fillOpacity: 0.6,
            zIndex: 10,
          });
          circle.bindTo('center', marker, 'position');
          this.circles.push(circle);
        }
      });
    });
  }

  clearMap() {
    this.markers.forEach(marker => marker.setMap(null));
    this.circles.forEach(marker => marker.setMap(null));
  }

  transformRange(x: number, in_min: number, in_max: number, out_min: number, out_max: number) {
    return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }

  isTableQuery(props :any) :boolean {
    return !props.props.data.request.targets.find((i :any) => i.format === 'time_series');
  }

  render() {
    if (!this.isTableQuery(this)) {
      throw new Error('This panel only supports table queries. Please set the "Format as" option underneath the query editor to "Table"');
    }
    return (
      <div
        className={cx(
          css`
            width: ${this.props.width}px;
            height: ${this.props.height}px;
          `
        )}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.props.options.apiKey }}
          defaultCenter={{
            lat: this.props.options.lat,
            lng: this.props.options.long,
          }}
          defaultZoom={this.props.options.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {this.initialize(map)}}
        ></GoogleMapReact>
      </div>
    );
  }
}
