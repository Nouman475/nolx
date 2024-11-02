import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Setting from './settings/setting'

export default function Dashboard() {
    return (
        <Routes>
            <Route index element={<Setting />} />
        </Routes>
    )
}
