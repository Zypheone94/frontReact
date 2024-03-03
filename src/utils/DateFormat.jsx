const DateFormat = ({value}) => {

    let sliced = null

    if (value !== undefined) {
        sliced = value.split('-')
    } else {
        sliced = null
    }

    return (

        sliced !== null ? (
            <>
                {sliced[2] + '/' + sliced[1] + '/' + sliced[0]}
            </>
        ) : (
            <></>
        )

    )
}
export default DateFormat