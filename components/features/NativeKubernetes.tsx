import React from "react"

export default function NativeKubernetes() {
  return (
    <div className="py-12 bg-gray-800 stripes background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h3 className="mt-2 text-3xl leading-8 font-extralight tracking-widest text-gray-200 sm:text-4xl sm:leading-10">
            Native Kubernetes support
          </h3>
          <ul className="flex flex-col sm:flex-row pt-8">
            <li className="flex-1 min-w-0 text-gray-100 text-center text-lg px-4 py-2 m-2">Complete replacement of CLI</li>
            <li className="flex-1 min-w-0 text-gray-100 text-center text-lg px-4 py-2 m-2">No need to memorize all commands</li>
            <li className="flex-1 min-w-0 text-gray-100 text-center text-lg px-4 py-2 m-2">x10 faster than using CLI</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
