import React, { useState } from "react";
import Chart from 'react-apexcharts';
import ScrollContainer from "react-indiana-drag-scroll";
import {
  CurrentWeatherModel,
  HourlyWeatherModel,
  SettingsModel,
} from "../../models";
import HourlyItem from "../HourlyItem/HourlyItem";
import "./Hourly.scss";

type HourlyProps = {
  settings: SettingsModel;
  data: HourlyWeatherModel;
  clickHandler: (h: CurrentWeatherModel) => void;
};

export const Hourly = ({ settings, data, clickHandler }: HourlyProps) => {
  const [activeIndex, setActiveIndex] = useState(
    data && data.hourly[0] ? data.hourly[0].dt : 0
  );
  
  const onClickHandler = (h: CurrentWeatherModel) => {
    setActiveIndex(h.dt);
    clickHandler(h);
  };
  const unitSymbol = settings.unit === "metric" ? "C" : "F";
  const lableColor = settings.theme === "light" ? "black" : "white";
  let seriesdata : Array<number>= []
  data.hourly.map((h) => seriesdata.push(h.temp))
  let time : Array<string> =[]
  data.hourly.map((h) => time.push(`${new Date(h.dt * 1000).getHours()}:00`))

  let options= {
    chart: {
      id: 'apexchart-example'
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    tooltip: {
      enabled: true,
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val:any) {
        return val + `°${unitSymbol}`;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: [lableColor]
      }
    },
   
    xaxis: {
      categories: time,
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val:any) {
          return val + `°${unitSymbol}`;
        }
      }
    
    },
  }
  let series= [{
    name: 'Temperature',
    data: seriesdata
  }]
  return (
    <div className="hourly">
      <label className="title">Hourly</label>
      <div className="hourly-items-container">
        <ScrollContainer>
          {data.hourly.map((h) => (
            <div
              key={h.dt}
              className={
                activeIndex === h.dt
                  ? "hourly-item-container active"
                  : "hourly-item-container"
              }
              onClick={() => onClickHandler(h)}
            >
              <HourlyItem settings={settings} data={h}></HourlyItem>
            </div>
          ))}
        </ScrollContainer>
        <label className="title">Hourly Graph</label>
        <div className="graph">
        <Chart options={options} series={series} type="bar" width={'100%'} height={520} />
        </div>
      </div>
    </div>
  );
};

export default Hourly;
