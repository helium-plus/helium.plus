import React from "react";
import Link from "next/link";

const ToolCard = (props) => {
  return (
    <Link href={props.link}>
      <a className="border-solid focus:border-4 border-gray-600 p-6 bg-gray-200 hover:bg-gray-300 w-full rounded-lg flex">
        <div className="pr-6">
          <div className="w-8 h-auto">{props.children}</div>
        </div>
        {/* <div className=""> */}
        <div className="mb-8">
          <h3 className="text-gray-900 font-bold text-xl mb-2 pr-8 font-display">
            {props.title}
          </h3>
          <p className="text-gray-700 font-body max-w-sm pr-8">
            {props.description}
          </p>
        </div>
        {/* </div> */}
      </a>
    </Link>
  );
};
export default ToolCard;
