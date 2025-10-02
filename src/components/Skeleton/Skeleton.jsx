/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const Skeleton = ({ className, type = '' }) => {
    return (
        <>
            {type == 'post' ? (
                <div className="flex w-52 flex-col gap-4">
                    <div className={"skeleton " + className}></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            ) : (
                <div className={"skeleton " + className}></div>
            )}
        </>
    )
}

export default Skeleton