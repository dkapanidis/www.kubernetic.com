import React from 'react'

function CheckoutButton({ clicked }: { clicked: boolean }) {
    return (
        <div className="pt-20 pb-20">
            <button type="submit" value="submit" className="btn btn-blue btn-popup float-right rounded py-3 px-8 w-40"  >
                {clicked ? "Loading..." : "Next"}
            </button>
        </div>
    )
}

export default CheckoutButton
