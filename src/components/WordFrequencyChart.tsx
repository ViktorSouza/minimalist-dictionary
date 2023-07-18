'use client'
import { Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	ChartOptions,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { useTheme } from '../hooks/useTheme'
import { useEffect, useRef } from 'react'
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types'
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
)

export default function WordFrequencyChart({
	wordFrequency,
}: {
	wordFrequency: number[]
}) {
	const [theme] = useTheme()
	const chartRef = useRef<ChartJSOrUndefined<'line', number[], number>>(null)
	const options: ChartOptions<'line'> = {
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			x: {
				// ticks: false,
				title: { display: false },
				grid: {
					display: false,
				},
			},
			y: {
				beginAtZero: true,
				title: { display: false },

				ticks: {
					//Yeah, two Number() :D
					callback: (value) => Number(Number(value).toFixed(4)) * 100 + '%',
				},
			},
		},
	}

	const mainColor = theme === 'light' ? '#2563eb' : '#38bdf8'
	const gridColor = theme === 'light' ? '#e5e7eb' : '#251f2b'
	const data = {
		labels: wordFrequency?.map((_, index) => index + 1800),
		datasets: [
			{
				label: 'Word usage',
				data: wordFrequency,
				pointBorderWidth: 0,
				pointRadius: 0,
			},
		],
	}

	useEffect(() => {
		if (!chartRef.current) return
		chartRef.current.options.borderColor = mainColor
		chartRef.current.options.backgroundColor = mainColor
		if (!chartRef.current.options.scales) return
		chartRef.current.options.scales.x!.grid!.color = gridColor
		chartRef.current.options.scales.y!.grid!.color = gridColor

		return chartRef.current?.update()
	}, [gridColor, mainColor, theme])
	if (wordFrequency.length === 0) return null

	return (
		<>
			<Line
				// type='line'
				ref={chartRef}
				options={options}
				data={data}
			/>
		</>
	)
}
