import React, { useEffect } from 'react';

const BarChart = () => {
  useEffect(() => {
    window.google.charts.load('current', { packages: ['corechart'] });
    window.google.charts.setOnLoadCallback(drawChart);
  }, []);

  const drawChart = () => {
    const data = new window.google.visualization.DataTable();
    data.addColumn('string', 'Step');
    data.addColumn('number', 'Duration');
    data.addRows([
      ['Sign Up', 2],
      ['Fill Out Information', 3],
      ['Upload Documents', 1],
      ['Get Verified', 4],
    ]);

    const options = {
      title: 'Process Duration',
      width: '100%',
      height: '100%',
      backgroundColor: '#f1f5f9',
      legend: { position: 'none' },
      hAxis: {
        title: 'Steps',
        textStyle: { color: '#007bff' },
      },
      vAxis: {
        title: 'Duration (minutes)',
        textStyle: { color: '#007bff' },
      },
      bars: 'horizontal',
      colors: ['#007bff', '#00c4ff', '#5cb85c', '#f0ad4e'],
      animation: {
        duration: 1500,
        easing: 'out',
        startup: true,
      },
      bar: { groupWidth: '75%' },
      tooltip: { isHtml: true, trigger: 'selection' },
    };

    const chart = new window.google.visualization.BarChart(document.getElementById('barchart'));
    chart.draw(data, options);

    // Add event listener for selection to show tooltips
    window.google.visualization.events.addListener(chart, 'select', function () {
      const selection = chart.getSelection();
      if (selection.length) {
        const row = selection[0].row;

        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.innerHTML = `Duration: ${data.getValue(row, 1)} minutes`;
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = '#fff';
        tooltip.style.border = '1px solid #ccc';
        tooltip.style.padding = '10px';
        tooltip.style.zIndex = '1000';
        tooltip.style.borderRadius = '5px';
        tooltip.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';

        // Position the tooltip
        const chartDiv = document.getElementById('barchart');
        const barPosition = chart.getChartLayoutInterface().getXLocation(data.getValue(row, 0));
        const tooltipWidth = 150; // Width for the tooltip

        // Calculate left position
        const leftPosition = Math.max(barPosition - tooltipWidth / 2, 0); // Center tooltip at the start of the bar
        const topPosition = chartDiv.offsetTop + 50; // Fixed distance from the chart

        // Ensure tooltip stays within the viewport
        tooltip.style.left = `${Math.min(leftPosition, window.innerWidth - tooltipWidth - 20)}px`;
        tooltip.style.top = `${topPosition}px`;

        chartDiv.appendChild(tooltip);

        // Remove tooltip after a few seconds
        setTimeout(() => {
          tooltip.remove();
        }, 3000);
      }
    });
  };

  return (
    <div id="barchart" style={{ margin: '20px auto', padding: '10px', borderRadius: '10px', background: 'linear-gradient(to right, #e3f2fd, #bbdefb)', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', height: '400px' }}></div>
  );
};

export default BarChart;
