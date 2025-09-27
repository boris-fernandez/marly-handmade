import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InputComplaintsBook from '../components/InputComplaintsBookComponent'

function ComplaintsBook() {
    return (
        <>
            <Header />
            <h2 className="text-3xl font-bold mb-8 whitespace-nowrap text-center mt-15">COMPLAINTS BOOK</h2>
            <div className="my-15 flex flex-col items-center -ml-50">
                <InputComplaintsBook titulo='TYPE OF DOCUMENT' />
                <InputComplaintsBook titulo='IDENTIFICATION NUMBER' />
                <InputComplaintsBook titulo='First name' />
                <InputComplaintsBook titulo='Middle name' />
                <InputComplaintsBook titulo="Father's Last Name" />
                <InputComplaintsBook titulo="Mother's Last Name" />
                <InputComplaintsBook titulo="Email" />
                <InputComplaintsBook titulo="Incident date" />
                <InputComplaintsBook titulo="Reserve medium" />
                <InputComplaintsBook titulo="record type" />
                <InputComplaintsBook titulo="Please describe the problem" extraMargin />
            </div>
            <Footer />
        </>
    )
}

export default ComplaintsBook