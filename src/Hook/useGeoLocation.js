    import { useEffect, useState } from 'react'

    const useGeoLocation = () => {
        const [location, setLocation] = useState({
            loaded: false,
            coordinates: {lat: null, lon: null } });

            const onSuccess = (location) =>{
                setLocation({
                    loaded: true,
                    coordinates:{
                        lat: location.coords.latitude,
                        lon: location.coords.longitude,
                    }
                })
            }

            const onError = (error)=>{
                setLocation({
                    loaded: true,
                    error,
                })
            }

            useEffect(() => {
                if (!("geolocation" in navigator)) {
                onError({
                    code: 0,
                    message: "Geolocation not supported!"
                })
                }
                navigator.geolocation.getCurrentPosition(onSuccess, onError)
            }, []);
            
            console.log(location);
            
    return location
    }

    export default useGeoLocation